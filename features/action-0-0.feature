
Feature: start the program
  As a/an teacher
  I need-to start the program
  so that I can get access to tools

  Scenario: must log on
    Given I have an account
    When I go to log in
    And fill in user name in user name-field
    And fill in password in password field
    And click submit
    Then I should be redirected to dashboard
