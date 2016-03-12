namespace HRM.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class HRMContext : DbContext
    {
        public HRMContext()
            : base("name=HRMContext")
        {
        }

        public virtual DbSet<dBoPhan> dBoPhans { get; set; }
        public virtual DbSet<dChucVu> dChucVus { get; set; }
        public virtual DbSet<dCongTy> dCongTies { get; set; }
        public virtual DbSet<dDonGia> dDonGias { get; set; }
        public virtual DbSet<dDonGiaCT> dDonGiaCTs { get; set; }
        public virtual DbSet<dDonGiaSP> dDonGiaSPs { get; set; }
        public virtual DbSet<dFQC> dFQCs { get; set; }
        public virtual DbSet<dHeSo> dHeSoes { get; set; }
        public virtual DbSet<dHeSoCT> dHeSoCTs { get; set; }
        public virtual DbSet<dKho> dKhoes { get; set; }
        public virtual DbSet<dNhanVien> dNhanViens { get; set; }
        public virtual DbSet<dQuyCach> dQuyCaches { get; set; }
        public virtual DbSet<dQuyCachCT> dQuyCachCTs { get; set; }
        public virtual DbSet<dSanPham> dSanPhams { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<dBoPhan>()
                .Property(e => e.mabophan)
                .IsUnicode(false);

            modelBuilder.Entity<dBoPhan>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dBoPhan>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dBoPhan>()
                .HasMany(e => e.dDonGias)
                .WithOptional(e => e.dBoPhan)
                .HasForeignKey(e => e.idbophan);

            modelBuilder.Entity<dBoPhan>()
                .HasMany(e => e.dHeSoes)
                .WithOptional(e => e.dBoPhan)
                .HasForeignKey(e => e.idbophan);

            modelBuilder.Entity<dBoPhan>()
                .HasMany(e => e.dNhanViens)
                .WithOptional(e => e.dBoPhan)
                .HasForeignKey(e => e.idbophan);

            modelBuilder.Entity<dChucVu>()
                .Property(e => e.machucvu)
                .IsUnicode(false);

            modelBuilder.Entity<dChucVu>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dChucVu>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dChucVu>()
                .HasMany(e => e.dNhanViens)
                .WithOptional(e => e.dChucVu)
                .HasForeignKey(e => e.idchucvu);

            modelBuilder.Entity<dCongTy>()
                .Property(e => e.macongty)
                .IsUnicode(false);

            modelBuilder.Entity<dCongTy>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dCongTy>()
                .Property(e => e.macty)
                .IsUnicode(false);

            modelBuilder.Entity<dCongTy>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dCongTy>()
                .HasMany(e => e.dNhanViens)
                .WithOptional(e => e.dCongTy)
                .HasForeignKey(e => e.idcty);

            modelBuilder.Entity<dDonGia>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dDonGia>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dDonGia>()
                .HasMany(e => e.dDonGiaCTs)
                .WithOptional(e => e.dDonGia)
                .HasForeignKey(e => e.iddongia);

            modelBuilder.Entity<dDonGiaCT>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dDonGiaCT>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dDonGiaSP>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dDonGiaSP>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dFQC>()
                .Property(e => e.fmaso)
                .IsUnicode(false);

            modelBuilder.Entity<dFQC>()
                .HasMany(e => e.dQuyCaches)
                .WithOptional(e => e.dFQC)
                .HasForeignKey(e => e.idFQC);

            modelBuilder.Entity<dHeSo>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dHeSo>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dHeSo>()
                .HasMany(e => e.dHeSoCTs)
                .WithOptional(e => e.dHeSo)
                .HasForeignKey(e => e.idHeSo);

            modelBuilder.Entity<dHeSoCT>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dHeSoCT>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dKho>()
                .Property(e => e.masp)
                .IsUnicode(false);

            modelBuilder.Entity<dNhanVien>()
                .Property(e => e.manhanvien)
                .IsUnicode(false);

            modelBuilder.Entity<dNhanVien>()
                .Property(e => e.machucvu)
                .IsUnicode(false);

            modelBuilder.Entity<dQuyCach>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dQuyCach>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dQuyCach>()
                .HasMany(e => e.dQuyCachCTs)
                .WithOptional(e => e.dQuyCach)
                .HasForeignKey(e => e.idquycach);

            modelBuilder.Entity<dQuyCachCT>()
                .Property(e => e.masanpham)
                .IsUnicode(false);

            modelBuilder.Entity<dQuyCachCT>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dQuyCachCT>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dSanPham>()
                .Property(e => e.nguoitao)
                .IsUnicode(false);

            modelBuilder.Entity<dSanPham>()
                .Property(e => e.nguoisua)
                .IsUnicode(false);

            modelBuilder.Entity<dSanPham>()
                .HasMany(e => e.dDonGiaSPs)
                .WithOptional(e => e.dSanPham)
                .HasForeignKey(e => e.idsp);

            modelBuilder.Entity<dSanPham>()
                .HasMany(e => e.dQuyCachCTs)
                .WithOptional(e => e.dSanPham)
                .HasForeignKey(e => e.idsanpham);

            modelBuilder.Entity<dQuyCach>()
                .HasMany(e => e.dDonGiaCTs)
                .WithOptional(e => e.dQuyCach)
                .HasForeignKey(e => e.idquycach);

            modelBuilder.Entity<dQuyCach>()
                .HasMany(e => e.dHeSoCTs)
                .WithOptional(e => e.dQuyCach)
                .HasForeignKey(e => e.idquycach);
        }
    }
}
