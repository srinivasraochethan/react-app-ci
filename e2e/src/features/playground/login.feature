Feature: As a user I can interact with login forms


  @smoke
  @regression
  Scenario Outline: As a user I can populate login details leveraging environment variables
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "$.TEST_EMAIL"
    And I fill in the "password" input with "$.TEST_PASSWORD"
    And the "email" should contain the value "admin@testingtalkshub.com.au"
    And the "password" should equal the value "<password>"

  @localhost
  Examples:
    | password      |
    | Password@1234 |

  @production
  Examples:
    | password   |
    | J2r@kka@IL |


  @smoke
  @regression
  Scenario Outline: As a user I expect validation on the login input for an incorrect email
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with "<email>"
    Then I fill in the "password" input with "Password1234"
    And the "email error" should contain the text "Please include an '@' in the email address."

  Examples:
    | email     |
    | abcd.efgh |
    | efgh.abcd |
    | abc       |



  @smoke
  @regression
  Scenario: As a user I am able to input a random email
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And I fill in the "email" input with random "email"
    And I fill in the "password" input with random "password"
    And I wait "10" seconds


