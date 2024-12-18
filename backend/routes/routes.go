package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"roc8/database"
	"roc8/handlers/auth"
	"roc8/handlers/data"
	"roc8/handlers/views"
	"roc8/middlewares"
)

func Routes() *fiber.App {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept, X-Karma-Admin-Auth, Authorization",
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
	v1.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(database.ResponseHTTP{
			Success: true,
			Data:    nil,
			Message: "OK",
		})
	})

	authRoutes := v1.Group("/auth")
	authRoutes.Post("/login", auth.Login)
	authRoutes.Post("/register", auth.Register)

	dataRoutes := v1.Group("/data")
	dataRoutes.Post("/create", middlewares.IsUserVerified, data.CreateDataRecord)
	dataRoutes.Get("/:rid", middlewares.IsUserVerified, data.GetRecordByRid)
	dataRoutes.Post("/filters", middlewares.IsUserVerified, data.GetDataByFilters)

	viewRoutes := v1.Group("/views")
	viewRoutes.Post("/create", middlewares.IsUserVerified, views.CreateView)
	viewRoutes.Get("/:vid", middlewares.IsUserVerified, views.GetViewByVid)
	viewRoutes.Post("/update", middlewares.IsUserVerified, views.UpdateViewByVid)
	viewRoutes.Get("/", middlewares.IsUserVerified, views.GetViewsByUid)

	return app
}
