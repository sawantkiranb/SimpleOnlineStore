using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace onlinestore.api.Migrations
{
    public partial class UpdatedCartEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateAdded",
                table: "Carts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateAdded",
                table: "Carts");
        }
    }
}
