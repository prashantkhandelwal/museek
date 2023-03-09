# syntax=docker/dockerfile:1

FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
COPY data ./data

RUN go build -o ./museek-api

EXPOSE 8080

CMD [ "./museek-api" ]