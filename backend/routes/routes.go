package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"roc8/database"
)

func Routes() *fiber.App {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, X-Karma-Admin-Auth",
		AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH, OPTIONS",
	}))
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(database.ResponseHTTP{
			Success: true,
			Data:    nil,
			Message: "OK",
		})
	})
	v1 := app.Group("/v1")

	return app
}
