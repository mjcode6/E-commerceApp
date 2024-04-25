package com.mjCode6.ecommerce.config;

import com.mjCode6.ecommerce.entity.Country;
import com.mjCode6.ecommerce.entity.Product;
import com.mjCode6.ecommerce.entity.ProductCategory;
import com.mjCode6.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;


    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
       // RepositoryRestConfigure.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.DELETE,HttpMethod.PUT};
     // disable http methode for product : put, post, and delete




        // disable http methode for product-category : put, post, and delete

        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Product.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(State.class, config, theUnsupportedActions);

        // call an internal methode for expose id's
        exposeIds(config);


    }

    private static void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) ->httpMethods.disable(theUnsupportedActions) ));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity id's




        // get a list of all entity classes from the entity manager

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array list of entity types

        List<Class> entityClasses = new ArrayList<>();

        // get the entity types for the entites

        for(EntityType tempEntityType : entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
// expose the entity ids for the array of entity /domain types

        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);




    }
}





 /* config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
        .withCollectionExposure(((metadata, httpMethods) ->httpMethods.disable(theUnsupportedActions) ));  */
