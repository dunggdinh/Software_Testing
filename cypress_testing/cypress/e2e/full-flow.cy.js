describe('Kiểm thử Flow hoàn chỉnh', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'

  it('Flow hoàn chỉnh: Đăng nhập → Xem sản phẩm → Thêm vào giỏ → Checkout', () => {
    // Step 1: Đăng nhập
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')

    // Step 2: Xem sản phẩm và thêm vào giỏ
    cy.get('.inventory_item').should('have.length.greaterThan', 0)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '2')

    // Step 3: Xem giỏ hàng
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('have.length', 2)

    // Step 4: Checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete.html')
  })

  it('Flow: Xem chi tiết → Quay lại → Thêm nhiều → Xóa một số', () => {
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    // Xem chi tiết
    cy.get('.inventory_item_name').first().click()
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('include', '/inventory.html')

    // Thêm 3 sản phẩm
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '3')

    // Xem giỏ hàng
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('have.length', 3)

    // Xóa 1 sản phẩm
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.cart_item').should('have.length', 2)
    cy.get('.shopping_cart_badge').should('have.text', '2')

    // Quay lại mua thêm
    cy.get('[data-test="continue-shopping"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Flow: Kiểm tra giá tiền toàn bộ workflow', () => {
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()

    // Thêm sản phẩm
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    // Xem giỏ hàng
    cy.get('.shopping_cart_link').click()
    cy.get('.inventory_item_price').should('be.visible')

    // Checkout
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Price')
    cy.get('[data-test="lastName"]').type('Checker')
    cy.get('[data-test="postalCode"]').type('99999')
    cy.get('[data-test="continue"]').click()

    // Kiểm tra giá tiền
    cy.get('.summary_subtotal_label').should('be.visible')
    cy.get('.summary_tax_label').should('be.visible')
    cy.get('.summary_total_label').should('be.visible')
  })
})
