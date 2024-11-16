package utils

import (
	"math/rand"
	"regexp"
	"strconv"
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"golang.org/x/crypto/bcrypt"
)

func GenerateOTP() string {
	otp := rand.Intn(900000) + 100000
	return strconv.Itoa(otp)
}

func GenerateID() string {
	id, _ := gonanoid.Generate("qwertyuiopasdfghjklzxcvbnm1234567890_-", 10)
	return id
}

// VerifyPhoneNumber checks if the phone number is in the format +917569236628
func VerifyPhoneNumber(phone string) bool {
	// Define the regular expression pattern
	phonePattern := `^\+91\d{10}$`
	// Compile the regular expression
	re := regexp.MustCompile(phonePattern)
	// Check if the phone number matches the pattern
	return re.MatchString(phone)
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func CheckPasswordHash(password, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func Contains(slice []string, item string) bool {
	for _, v := range slice {
		if v == item {
			return true
		}
	}
	return false
}

func GetNow() string {
	return time.Now().String()
}
