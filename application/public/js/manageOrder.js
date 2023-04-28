$(document).ready(function() {
    // Hide all order details by default
    $('.collapse').hide();
  
    // Add click event listener to table rows
    $('tbody tr').click(function() {
      // Toggle the visibility of the corresponding order details
      $(this).next('.collapse').slideToggle();
    });
  
    // Expand the first order details by default
    $('tbody tr:first-child').click();
  });
  
  
  $(document).ready(function() {
    $('form').submit(function(e) {
      e.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        type: 'POST',
        url: '/addOrder',
        data: formData,
        success: function() {
          alert('Order successfully added!');
          $('form')[0].reset();
        },
        error: function() {
          alert('Error adding order!');
        }
      });
    });
  });
  