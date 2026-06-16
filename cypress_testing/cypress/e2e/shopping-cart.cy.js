describe('Kiểm thử Giỏ hàng', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'

  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Xem giỏ hàng trống', () => {
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_list').should('exist')
  })

  it('Giỏ hàng trống không có badge', () => {
    cy.get('.shopping_cart_badge').should('not.exist')
  })

  it('Thêm sản phẩm vào giỏ hàng và xem', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('have.length', 1)
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
  })

  it('Kiểm tra tên, giá trong giỏ hàng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('have.length', 2)
    cy.get('.inventory_item_price').should('be.visible')
  })

  it('Xóa sản phẩm từ giỏ hàng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('have.length', 2)
    
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.cart_item').should('have.length', 1)
  })

  it('Xóa tất cả sản phẩm', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
    
    cy.get('.cart_item').should('not.exist')
  })

  it('Tiếp tục mua sắm từ giỏ hàng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    
    cy.get('[data-test="continue-shopping"]').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('Kiểm tra số lượng sản phẩm trong badge', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    
    cy.get('.shopping_cart_badge').should('have.text', '3')
  })

  it('Tổng giá tiền được tính đúng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    
    cy.get('.inventory_item_price').should('be.visible')
  })
})
