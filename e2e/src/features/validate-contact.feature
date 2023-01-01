Feature: As a user I expect to be able to validate a new contact

  @regression
  Scenario: As a user I can hit a validation error on each field then create a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And the "save" should be displayed
    And the "cancel" should be displayed
    Then I click the "save" button
    And the "error message" should contain the text "Error: The "name" field can't be empty."
    Then I fill in the "name" input with "Tony Stark"
    And I click the "save" button
    And the "error message" should contain the text "Error: The "phone" field can't be empty."
    Then I fill in the "phone" input with "123-515-8555"
    And I click the "save" button
    And the "error message" should contain the text "Error: The "street" field can't be empty."
    Then I fill in the "street" input with "123 Shelby Road"
    And I click the "save" button
    And the "error message" should contain the text "Error: The "city" field can't be empty."
    Then I fill in the "city" input with "Springfield"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Tony Stark"
    And the "search" should not equal the text "Tony Star"
    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Tony Stark"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "123 Shelby Road, Springfield"
    And the "edit" should be displayed
    And the "delete" should be displayed

