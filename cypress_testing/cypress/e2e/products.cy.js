describe('Kiểm thử Sản phẩm', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'

  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Hiển thị danh sách sản phẩm', () => {
    cy.get('.inventory_list').should('be.visible')
    cy.get('.inventory_item').should('have.length.greaterThan', 0)
  })

  it('Mỗi sản phẩm có name, price, description', () => {
    cy.get('.inventory_item').each($item => {
      cy.wrap($item).find('.inventory_item_name').should('be.visible')
      cy.wrap($item).find('.inventory_item_price').should('be.visible')
      cy.wrap($item).find('.inventory_item_desc').should('be.visible')
    })
  })

  it('Xem chi tiết sản phẩm', () => {
    cy.get('.inventory_item_name').first().click()
    cy.url().should('include', '/inventory-item.html')
    cy.get('.inventory_details').should('be.visible')
    cy.get('.inventory_details_name').should('be.visible')
    cy.get('.inventory_details_price').should('be.visible')
  })

  it('Quay lại từ trang chi tiết sản phẩm', () => {
    cy.get('.inventory_item_name').first().click()
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Thêm sản phẩm vào giỏ hàng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it('Thêm nhiều sản phẩm vào giỏ hàng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    
    cy.get('.shopping_cart_badge').should('have.text', '3')
  })

  it('Xóa sản phẩm khỏi giỏ hàng', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
    
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('not.exist')
  })

  it('Nút Add to Cart đổi thành Remove', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('exist')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist')
  })
})
