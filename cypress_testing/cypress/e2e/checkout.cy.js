describe('Kiểm thử Thanh toán', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'

  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
    
    // Thêm sản phẩm vào giỏ hàng
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  })

  it('Mở trang checkout', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.url().should('include', '/checkout-step-one.html')
  })

  it('Nhập thông tin cá nhân đầy đủ', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')
  })

  it('Hiển thị lỗi khi thiếu tên', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'First Name is required')
  })

  it('Hiển thị lỗi khi thiếu họ', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Last Name is required')
  })

  it('Hiển thị lỗi khi thiếu mã bưu điện', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="continue"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Postal Code is required')
  })

  it('Xem tóm tắt đơn hàng trong checkout', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.cart_item').should('have.length', 2)
  })

  it('Kiểm tra tổng giá tiền, thuế, toàn thẳng', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    cy.get('.summary_subtotal_label').should('be.visible')
    cy.get('.summary_tax_label').should('be.visible')
    cy.get('.summary_total_label').should('be.visible')
  })

  it('Quay lại từ trang checkout step 1', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="cancel"]').click()
    cy.url().should('include', '/cart.html')
  })

  it('Hoàn thành thanh toán thành công', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="finish"]').click()
    
    cy.url().should('include', '/checkout-complete.html')
  })

  it('Hiển thị thông báo thành công sau khi đặt hàng', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type('Toan')
    cy.get('[data-test="lastName"]').type('Nguyen')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    
    cy.url().should('include', '/checkout-complete.html')
    cy.get('.complete-header').should('contain', 'Thank you for your order')
  })
})
