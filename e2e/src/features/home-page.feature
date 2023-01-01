Feature: As a user I expect to be able to navigate to the home page

  @regression
  Scenario: As a user I expect to be able to see contacts
    Given I am on the "home" page
    And the "header logo" should be displayed
    Then the "contacts header" should contain the text "Contact"
#    Then the "contacts header" should not contain the text "Contacts "New" Cameron" // (possible to send quotes within the args)


  @regression
  Scenario: As a user I don't expect to see a contact that does not exist
    Given I am on the "home" page
    And I fill in the "search" input with "Funky Name"
    Then the "contact" should not be displayed
    When I fill in the "search" input with "Abraham Perry"
    Then the "contact" should be displayed

