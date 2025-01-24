const { Builder, By, until } = require("selenium-webdriver");

const assert = require("assert");
(async function testAuthentication() {
    
  let driver = await new Builder().forBrowser("chrome").build();
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  try {
    // Test: Register with empty username
    await driver.get("http://localhost:5173/register");
    await driver.findElement(By.id("username")).sendKeys("");
    await driver.findElement(By.id("email")).sendKeys("validUser@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("StrongP@ssw0rd");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Register with empty email
    await driver.get("http://localhost:5173/register");
    await driver.findElement(By.id("username")).sendKeys("validUser");
    await driver.findElement(By.id("email")).sendKeys("");
    await driver.findElement(By.id("password")).sendKeys("StrongP@ssw0rd");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Register with invalid email
    await driver.get("http://localhost:5173/register");
    await driver.findElement(By.id("username")).sendKeys("validUser");
    await driver.findElement(By.id("email")).sendKeys("invalidEmail");
    await driver.findElement(By.id("password")).sendKeys("StrongP@ssw0rd");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Register with empty password
    await driver.get("http://localhost:5173/register");
    await driver.findElement(By.id("username")).sendKeys("validUser");
    await driver.findElement(By.id("email")).sendKeys("validUser@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Register with valid credentials
    await driver.get("http://localhost:5173/register");
    await driver.findElement(By.id("username")).sendKeys("validUser");
    await driver.findElement(By.id("email")).sendKeys("validUser@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("StrongP@ssw0rd");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Login with invalid password
    await driver.get("http://localhost:5173/login");
    await driver.findElement(By.id("email")).sendKeys("validUser@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("InvalidPassword");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Login with invalid email
    await driver.get("http://localhost:5173/login");
    await driver.findElement(By.id("email")).sendKeys("invalidEmail");
    await driver.findElement(By.id("password")).sendKeys("StrongP@ssw0rd");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);

    // Test: Login with valid credentials
    await driver.get("http://localhost:5173/login");
    await driver.findElement(By.id("email")).sendKeys("validUser@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("StrongP@ssw0rd");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await sleep(2000);
  } finally {
    await driver.quit();
  }
})();
