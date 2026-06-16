describe('Kiểm thử Đăng nhập', () => {
  const baseUrl = 'https://www.saucedemo.com/'
  const password = 'secret_sauce'
  
  beforeEach(() => {
    cy.visit(baseUrl)
  })

  // Test trang đăng nhập
  it('Mở thành công trang đăng nhập', () => {
    cy.get('.login_logo').should('be.visible').and('have.text', 'Swag Labs')
  })

  // Test standard_user
  it('Đăng nhập thành công với standard_user', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  // Test locked_out_user
  it('Locked_out_user không thể đăng nhập', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Sorry, this user has been locked out')
  })

  // Test problem_user
  it('Đăng nhập thành công với problem_user', () => {
    cy.get('[data-test="username"]').type('problem_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  // Test performance_glitch_user
  it('Đăng nhập thành công với performance_glitch_user', () => {
    cy.get('[data-test="username"]').type('performance_glitch_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  // Test error_user
  it('Đăng nhập thành công với error_user', () => {
    cy.get('[data-test="username"]').type('error_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  // Test visual_user
  it('Đăng nhập thành công với visual_user', () => {
    cy.get('[data-test="username"]').type('visual_user')
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  // Test mật khẩu sai
  it('Đăng nhập thất bại với mật khẩu sai', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match')
  })

  // Test không nhập username
  it('Hiển thị lỗi khi không nhập username', () => {
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username is required')
  })

  // Test không nhập password
  it('Hiển thị lỗi khi không nhập password', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="login-button"]').click()
    
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Password is required')
  })

  // Test đóng thông báo lỗi
  it('Có thể đóng thông báo lỗi', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click()
    
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('.error-button').click()
    cy.get('[data-test="error"]').should('not.exist')
  })
})
