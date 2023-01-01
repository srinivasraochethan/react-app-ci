Feature: As a user I expect to be able to edit a new contact

  @regression
  Scenario: As a user I can edit a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    Then I fill in the "name" input with "Tony Bongo"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input with "123-555-8113"
    And I fill in the "street" input with "730 Puma Terrace"
    And I fill in the "city" input with "Springfield"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Tony Bongo"
    Then the "contact" should be displayed
    And I click the "edit" button
    And I am directed to the "edit contact" page
    Then I fill in the "name" input with "Morgana Stark"
    And I select the "Female" option from the "gender"
    And I fill in the "phone" input with "123-555-8114"
    And I fill in the "street" input with "731 Puma Terrace"
    And I fill in the "city" input with "Brooklyn"
    Then I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Morgana Stark"
    And the "search" should not equal the text "Morgana Star"
    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Morgana Stark"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Female"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "731 Puma Terrace, Brooklyn"
    And the "edit" should be displayed
    And the "delete" should be displayed



