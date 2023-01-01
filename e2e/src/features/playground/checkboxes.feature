Feature: As a user i can interact with checkboxes


  @smoke
  @regression
  Scenario: As a user I can interact and assert on checkboxes
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "blue radio button" check box should not be checked
    And the "purple radio button" check box should not be checked
    And the "green radio button" check box should not be checked
    And the "grey radio button" check box should not be checked
    And the "red radio button" check box should not be checked
    And I check the "green radio button" check box
    And I check the "grey radio button" check box
    And the "green radio button" check box should be checked
    And the "grey radio button" check box should be checked
    And the "blue radio button" check box should not be checked
    And the "purple radio button" check box should not be checked
    And the "red radio button" check box should not be checked
    And I uncheck the "green radio button" check box
    And the "green radio button" check box should not be checked

