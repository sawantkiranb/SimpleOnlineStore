using System.ComponentModel.DataAnnotations;

namespace onlinestore.api.Dtos
{
    public class AddressToCreateDto
    {
        public int? Id { get; set; }

        [Required]
        [StringLength(100)]
        public string ContactName { get; set; }

        [Required]
        public string Mobile { get; set; }

        [Required]
        [StringLength(6)]
        public string Pincode { get; set; }

        [Required]
        [StringLength(150)]
        public string Address { get; set; }

        [Required]
        [StringLength(50)]
        public string Locality { get; set; }

        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        [StringLength(50)]
        public string State { get; set; }
        public bool IsHome { get; set; }
        public bool IsDefault { get; set; }

        public AddressToCreateDto()
        {
            IsHome = false;
            IsDefault = false;
        }
    }
}