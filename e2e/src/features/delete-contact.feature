Feature: As a user I expect to be able to delete a new contact

  @regression
  Scenario: As a user I can cancel creating a new contact
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
    And I click accept on the alert dialog
    And I click the "delete" button
    And I fill in the "search" input with "Tony Bongo"
    Then the "contact" should not be displayed
    And the "no items message" should contain the text "There are no items to display"