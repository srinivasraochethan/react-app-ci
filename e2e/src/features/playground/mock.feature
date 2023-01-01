Feature: As a user I can intercept a REST api and mock the response


  @smoke
  @regression
  Scenario: As a user I expect to see the REST users
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "1st" "full name" should contain the text "Leanne Graham"


  @smoke
  @regression
  Scenario: As a user I can mock no users existing
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "no users"
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "full name" should not be displayed


  @smoke
  @regression
  Scenario: As a user I can mock a single user
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "single-user"
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "1st" "full name" should not contain the text "Leanne Graham"
    Then the "1st" "full name" should contain the text "Tony Stark"


  @smoke
  @regression
  Scenario: As a user I can mock a single user
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "single-user"
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "1st" "full name" should not contain the text "Leanne Graham"
    Then the "1st" "full name" should contain the text "Tony Stark"

  @smoke
  @regression
  Scenario: As a user I can mock multiple users
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "multiple-users"
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "1st" "full name" should not contain the text "Leanne Graham"
    Then the "1st" "full name" should contain the text "Tony Stark"
    Then the "2nd" "full name" should contain the text "Bruce Wayne"
    Then the "3rd" "full name" should contain the text "Edward Elric"

  @dev
  @smoke
  @regression
  Scenario: As a user I can validate only 5 users will display as expected
    Given I am on the "home" page
    And the "api" endpoint for "users" is mocked with "six users"
    And I click the "playground" button
    When I am directed to the "playground" page
    Then the "1st" "full name" should not contain the text "Leanne Graham"
    Then the "1st" "full name" should contain the text "Tony Stark"
    Then the "2nd" "full name" should contain the text "Bruce Wayne"
    Then the "3rd" "full name" should contain the text "Luke Skywalker"
    Then the "4th" "full name" should contain the text "Edward Elric"
    Then the "5th" "full name" should contain the text "Saitama One Punch Man"
    Then the "6th" "full name" should not be displayed