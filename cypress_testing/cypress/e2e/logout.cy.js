describe('Kiểm thử Đăng xuất', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'

  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Đăng xuất thành công', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    
    cy.url().should('eq', baseUrl)
    cy.get('[data-test="login-button"]').should('be.visible')
  })

  it('Có thể đăng nhập lại sau khi đăng xuất', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    
    cy.url().should('eq', baseUrl)
    
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('Mình hàng giỏ hàng sau khi đăng xuất', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.get('.shopping_cart_badge').should('not.exist')
  })
})
