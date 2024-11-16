package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/xuri/excelize/v2"
)

type Data struct {
	Day      string `json:"timestamp"`
	Age      int    `json:"age"`    // 0 for 15-25 and 1 for >25, assuming age is in this range
	Gender   int    `json:"gender"` // 0 for female and 1 for male
	FeatureA int    `json:"feature_a"`
	FeatureB int    `json:"feature_b"`
	FeatureC int    `json:"feature_c"`
	FeatureD int    `json:"feature_d"`
	FeatureE int    `json:"feature_e"`
	FeatureF int    `json:"feature_f"`
}

func main() {
	api := "http://localhost:9000/v1/data/create"
	f, err := excelize.OpenFile("data.xlsx")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer func() {
		// Close the spreadsheet.
		if err := f.Close(); err != nil {
			fmt.Println(err)
		}
	}()
	rows, err := f.GetRows("Sheet3")
	if err != nil {
		fmt.Println(err)
		return
	}
	dataset := make([]Data, len(rows))
	for i, row := range rows {
		//Skip the first row
		if row[0] == "Day" {
			continue
		}
		dataset[i].Day = row[0]
		if row[1] == "15-25" {
			dataset[i].Age = 0
		} else {
			dataset[i].Age = 1
		}
		if row[2] == "Male" {
			dataset[i].Gender = 1
		} else {
			dataset[i].Gender = 0
		}
		a, err := strconv.Atoi(row[3])
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			return
		}
		dataset[i].FeatureA = a
		b, err := strconv.Atoi(row[4])
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			return
		}
		dataset[i].FeatureB = b
		c, err := strconv.Atoi(row[5])
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			return
		}
		dataset[i].FeatureC = c
		d, err := strconv.Atoi(row[6])
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			return
		}
		dataset[i].FeatureD = d
		e, err := strconv.Atoi(row[7])
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			return
		}
		dataset[i].FeatureE = e
		f, err := strconv.Atoi(row[8])
		if err != nil {
			fmt.Println("Error converting string to int:", err)
			return
		}
		dataset[i].FeatureF = f
	}
	// fmt.Println(dataset)
	fmt.Println("Number of rows: ", len(dataset))
	for i, data := range dataset {
		fmt.Println("Creating row ", i+1)
		jsonPayload, err := json.Marshal(data)
		if err != nil {
			fmt.Println("Error converting struct to json:", err)
			return
		}
		req, err := http.NewRequest("POST", api, bytes.NewBuffer(jsonPayload))
		if err != nil {
			fmt.Println("Error creating request:", err)
			return
		}
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthcnRpa2RkOTBAZ21haWwuY29tIiwidWlkIjoieXl2aThraDloOCJ9.6oLgslXB4-SBwrUBCzaafikPuoLcKFZQPa6clf4JKX4")
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println("Error sending request:", err)
			return
		}
		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			fmt.Println("Error reading response body:", err)
			return
		}
		fmt.Println("Response Status:", resp.Status)
		fmt.Println("Response Body:", string(body))
	}
}
