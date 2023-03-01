package main
import (
	"strings"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

const MAX_RESULTS = 30
const DATA_FILE_PATH = "./data/"

func getDataset() []string {
	datafiles := [3]string{"artists.json", "names.json", "cities.json"}
	var dataset []string

	// Read list of artists from json
	for _, filename := range datafiles {
		jsonFile, _ := os.Open(DATA_FILE_PATH + filename)
		defer jsonFile.Close()
		byteValue, _ := ioutil.ReadAll(jsonFile)	
		var filedata []string
		json.Unmarshal(byteValue, &filedata)
		dataset = append(dataset, filedata...)
	}

	return dataset
}

func getQuery(c *gin.Context) {
	query := c.Query("query")

	if (query == "") {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Query cannot be empty"})
		return
	}

	var results []string
	dataset := getDataset()
	for _, country := range dataset {
		// Match if query is prefix, case-insensitive
		if strings.HasPrefix(strings.ToLower(country), strings.ToLower(query)) {
			results = append(results, country)
		}
	}
	if len(results) > 0 {
		// Truncate if too long
		if (len(results) > MAX_RESULTS) {
			results = results[:MAX_RESULTS]
		} 
		c.IndentedJSON(http.StatusOK, gin.H{"data": results})
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Query not found"})
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/search", getQuery)
	router.Run("localhost:8080")
}