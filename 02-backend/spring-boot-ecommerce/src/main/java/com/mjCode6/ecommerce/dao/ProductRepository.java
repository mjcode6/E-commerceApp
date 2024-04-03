package com.mjCode6.ecommerce.dao;

import com.mjCode6.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductRepository extends JpaRepository<Product, Long> {
}
