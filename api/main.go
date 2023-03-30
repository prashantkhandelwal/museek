package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly"
)

type Source struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type Hits struct {
	Hits   []Hits `json:"hits"`
	Source Source `json:"_source"`
}

type Data struct {
	Hits Hits `json:"hits"`
}

type Artists struct {
	Name []string `json:"name"`
}

func main() {

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// AllowOriginFunc: func(origin string) bool {
		// 	return origin == "https://github.com"
		// },
		// MaxAge: 12 * time.Hour,
	}))

	r.GET("/genre", func(c *gin.Context) {
		path := filepath.Join("data", "genre.json")
		data, err := ioutil.ReadFile(path)
		if err != nil {
			fmt.Println("ERROR: Cannot read file")
		}
		//time.Sleep(time.Second * 5)
		var output interface{}
		_ = json.Unmarshal(data, &output)
		c.JSON(http.StatusOK, gin.H{
			"result": output,
		})
	})

	r.GET("/artist/:name", func(c *gin.Context) {
		name := c.Param("name")

		fmt.Println("NAME: ", name)

		query := `{
			"search_type": "matchphrase",
			"query":
			{
				"term": "%s"
			},
			"sort_fields": ["-@name"],
			"from": 0,
			"max_results": 100,
			"_source": []
		}`

		final_query := fmt.Sprintf(query, name)
		fmt.Println(final_query)

		req, err := http.NewRequest("POST", "http://localhost:4080/api/mbartist/_search", strings.NewReader(final_query))
		if err != nil {
			log.Fatal(err)
		}
		req.SetBasicAuth("admin", "Complexpass#123")
		req.Header.Set("Content-Type", "application/json")
		//req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36")

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			log.Fatal(err)
		}

		defer resp.Body.Close()

		log.Println(resp.StatusCode)

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}

		response := []byte(string(body))

		var search Data

		json.Unmarshal(response, &search)

		fmt.Println("HITS - ", len(search.Hits.Hits))

		a := []Source{}

		var i int
		for _, v := range search.Hits.Hits {
			i = i + 1
			n := Source{Id: v.Source.Id, Name: v.Source.Name}
			a = append(a, n)
		}

		fmt.Println(&a)

		c.JSON(http.StatusOK, gin.H{
			"result": &a,
		})
	})

	r.POST("/artistimage", func(c *gin.Context) {
		time.Sleep(time.Second * 5)
		var imageUrl string
		url := c.PostForm("url")

		if strings.Contains(url, "twimg") {
			imageUrl = url
		} else {
			coll := colly.NewCollector()
			coll.OnHTML("meta", func(e *colly.HTMLElement) {
				if e.Attr("property") == "og:image" {
					imageUrl = e.Attr("content")
				}
			})
			coll.Visit(url)
		}

		c.JSON(http.StatusOK, gin.H{
			"result": imageUrl,
		})
	})

	r.Run(":9999")
}
