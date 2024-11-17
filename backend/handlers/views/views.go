package views

import (
	"encoding/json"
	"fmt"
	"roc8/database"
	"roc8/helpers/views"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Filters struct {
	Age       int    `json:"age"`
	Gender    int    `json:"gender"`
	DateStart string `json:"date_start"`
	DateEnd   string `json:"date_end"`
}

func CreateView(c *fiber.Ctx) error {
	req := new(Filters)
	if err := c.BodyParser(req); err != nil {
		fmt.Println("Error parsing request")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}
	filterJSON, err := json.Marshal(req)
	if err != nil {
		fmt.Println("Error stringifying filters:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error stringifying filters",
		})
	}

	// Convert filters to a string
	filterJSONString := string(filterJSON)

	viewsData := new(database.Views)

	viewsData.CreatedBy = c.Locals("uid").(string)
	viewsData.Filters = filterJSONString
	viewsData.CreatedAt = time.Now()
	view, err := views.CreateView(viewsData)
	if err != nil {
		fmt.Println("Error creating view")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error creating view",
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "View created",
		"data":    view,
	})
}

func GetViewByVid(c *fiber.Ctx) error {
	vid := c.Params("vid")
	view, err := views.GetViewByVid(vid)
	if err != nil {
		fmt.Println("Error getting view")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error getting view",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "View retrieved",
		"data":    view,
	})
}

func GetViewsByUid(c *fiber.Ctx) error {
	uid := c.Locals("uid").(string)
	views, err := views.GetViewByUID(uid)
	if err != nil {
		fmt.Println("Error getting views")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error getting views",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Views retrieved",
		"data":    views,
	})
}

func UpdateViewByVid(c *fiber.Ctx) error {
	req := new(database.Views)
	if err := c.BodyParser(req); err != nil {
		fmt.Println("Error parsing request")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}
	view, err := views.UpdateView(req)
	if err != nil {
		fmt.Println("Error updating view")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error updating view",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "View updated",
		"data":    view,
	})
}
