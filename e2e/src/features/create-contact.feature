Feature: As a user I expect to be able to create contacts


  @regression
  Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And I fill in the "name" input with "Ted Smith"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input with "9740766266"
    And I fill in the "street" input with "38 East Park Road"
    And I fill in the "city" input with "Bengaluru"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Ted Smith"
    And the "search" should not equal the text "Teddy Smit"
    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Ted Smith"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "38 East Park Road, Bengaluru"
    And the "edit" should be displayed
    And the "delete" should be displayed


    @smoke
    @regression
    Scenario: As a user I do not expect saved contacts to persist after a page refresh
      Given I am on the "home" page
      And I click the "create" button
      Then I am directed to the "create contact" page
      And the "create contact header" should contain the text "Create Contact"
      And I fill in the "name" input with "Lord Krishna"
      And I select the "Male" option from the "gender"
      And I fill in the "phone" input with "9740548505"
      And I fill in the "street" input with "Dwaraka"
      And I fill in the "city" input with "Bengaluru"
      And I click the "save" button
      And I am directed to the "home" page

      And I fill in the "search" input with "Lord Krishna"
      And the "search" should not equal the text "Lord Krish"
      And the "full name label" should contain the text "Name:"
      And the "name" should equal the text "Lord Krishna"
      And the "gender label" should contain the text "Gender:"
      And the "gender" should equal the text "Male"
      And the "address label" should contain the text "Address:"
      And the "address" should equal the text "Dwaraka, Bengaluru"
      And the "edit" should be displayed
      And the "delete" should be displayed

      And I refresh the "home" page

      And I fill in the "search" input with "Lord Krishna"
      Then the "contact" should not be displayed







