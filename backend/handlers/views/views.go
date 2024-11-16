package views

import (
	"fmt"
	"roc8/database"
	"roc8/helpers/views"

	"github.com/gofiber/fiber/v2"
)

func CreateView(c *fiber.Ctx) error {
	req := new(database.Views)
	if err := c.BodyParser(req); err != nil {
		fmt.Println("Error parsing request")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}
	view, err := views.CreateView(req)
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
