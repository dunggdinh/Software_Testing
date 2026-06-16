describe('Kiểm thử các User đặc biệt', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'

  // Test problem_user
  describe('Problem User - Có vấn đề giao diện', () => {
    beforeEach(() => {
      cy.visit(baseUrl)
      cy.get('[data-test="username"]').type('problem_user')
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()
      cy.url().should('include', '/inventory.html')
    })

    it('problem_user có thể đăng nhập', () => {
      cy.get('.inventory_list').should('be.visible')
      cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })

    it('problem_user có thể thêm sản phẩm vào giỏ hàng', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
    })

    it('problem_user có thể xem giỏ hàng', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_link').click()
      cy.url().should('include', '/cart.html')
      cy.get('.cart_item').should('have.length', 1)
    })
  })

  // Test performance_glitch_user
  describe('Performance Glitch User - Có vấn đề tốc độ', () => {
    beforeEach(function() {
      cy.visit(baseUrl, { timeout: 60000 })
      cy.get('[data-test="username"]', { timeout: 60000 }).type('performance_glitch_user')
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click({ timeout: 60000 })
      cy.url({ timeout: 60000 }).should('include', '/inventory.html')
    })

    it('performance_glitch_user có thể đăng nhập', () => {
      cy.get('.inventory_list').should('be.visible')
    })

    it('performance_glitch_user có thể thêm sản phẩm vào giỏ hàng', function() {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]', { timeout: 60000 }).click()
      cy.get('.shopping_cart_badge', { timeout: 60000 }).should('have.text', '1')
    })

    it('performance_glitch_user có thể xem danh sách sản phẩm', () => {
      cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
  })

  // Test error_user
  describe('Error User - Có vấn đề lỗi HTTP', () => {
    beforeEach(() => {
      cy.visit(baseUrl)
      cy.get('[data-test="username"]').type('error_user')
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()
      cy.url().should('include', '/inventory.html')
    })

    it('error_user có thể đăng nhập', () => {
      cy.get('.inventory_list').should('be.visible')
      cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })

    it('error_user có thể thêm sản phẩm vào giỏ hàng', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
    })

    it('error_user có thể xem giỏ hàng', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_link').click()
      cy.url().should('include', '/cart.html')
      cy.get('.cart_item').should('have.length', 1)
    })
  })

  // Test visual_user
  describe('Visual User - Có vấn đề hiển thị hình ảnh', () => {
    beforeEach(() => {
      cy.visit(baseUrl)
      cy.get('[data-test="username"]').type('visual_user')
      cy.get('[data-test="password"]').type(password)
      cy.get('[data-test="login-button"]').click()
      cy.url().should('include', '/inventory.html')
    })

    it('visual_user có thể đăng nhập', () => {
      cy.get('.inventory_list').should('be.visible')
      cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })

    it('visual_user có thể xem chi tiết sản phẩm', () => {
      cy.get('.inventory_item_name').first().click()
      cy.url().should('include', '/inventory-item.html')
      cy.get('.inventory_details').should('be.visible')
    })

    it('visual_user có thể thêm sản phẩm vào giỏ hàng', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_badge').should('have.text', '1')
    })

    it('visual_user có thể xem giỏ hàng và checkout', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_link').click()
      cy.get('[data-test="checkout"]').click()
      
      cy.get('[data-test="firstName"]').type('Visual')
      cy.get('[data-test="lastName"]').type('User')
      cy.get('[data-test="postalCode"]').type('12345')
      cy.get('[data-test="continue"]').click()
      
      cy.url().should('include', '/checkout-step-two.html')
    })
  })
})
