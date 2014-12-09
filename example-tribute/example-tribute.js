// Let's be good developers and not pollute the global namespace
(function($) {
  
  // Let's make sure the DOM is ready
  $(function() {
    
    // Create an instance of the DonationService
    var ds = new BLACKBAUD.api.DonationService(
      $('.BBDonationApiContainer').data('partid')
    );
    
    // Create the donation object we'll send
    // In order to simplify our examples, some of this information is hard-coded.
    var donation = {
      MerchantAccountId: '00000000-0000-0000-0000-000000000000',
      Tribute: {},
      Gift: {
        PaymentMethod: 0,
        Designations: [
          {
            Amount: 5.00,
            DesignationId: '00000000-0000-0000-0000-000000000000'
          }
        ]
      }
    };
    
    // Create our success handler
    var success = function(returnedDonation) {
      console.log(returnedDonation);
    };
    
    // Create our error handler
    var error = function(returnedErrors) {
      console.log('Error!');
    };
    
    // Attach our event listener to the donate button
    $('.btn-donate').click(function(e) {
      
      // Stop the button from submitting the form
      e.preventDefault(); 
      
      // Add the information our user has typed
      donation.Donor = {
        FirstName: $('#first-name').val(),
        LastName: $('#last-name').val(),
        Address: {
          StreetAddress: $('#address').val(),
          City: $('#city').val(),
          State: $('#state').val(),
          PostalCode: $('#zip').val(),
          Country: $('#country').val()
        }
      };

      // Add our tribute information
      // See REST api tech reference for more information on the Type field
      donation.Tribute.TributeDefintion = {
        Type: 'Tribute',      
        FirstName: $('#tribute-first-name'),
        LastName: $('#tribute-last-name'),
        Description: $('tribute-description')
      };
      
      // Add our acknowledgee information
      donation.Tribute.Acknowledgee = {
        FirstName: $('#acknowledgee-first-name').val(),
        LastName: $('#acknowledgee-last-name').val(),
        Address: {
          StreetAddress: $('#acknowledgee-address').val(),
          City: $('#acknowledgee-city').val(),
          State: $('#acknowledgee-state').val(),
          PostalCode: $('#acknowledgee-zip').val(),
          Country: $('#acknowledgee-country').val()
        }
      };
      
      // Submit our donation
      ds.createDonation(donation, success, error);
    });
    
  });
}(jQuery));