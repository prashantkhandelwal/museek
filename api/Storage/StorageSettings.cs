using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Storage
{
    public class StorageSettings: IStorageSettings
    {
        public string Host { get; set; }
        public string Database { get; set; }
    }

    public interface IStorageSettings
    {
        public string Host { get; set; }
        public string Database { get; set; }
    }
}
