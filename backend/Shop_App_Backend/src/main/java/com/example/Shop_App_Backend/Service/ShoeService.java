package com.example.Shop_App_Backend.Service;

import com.example.Shop_App_Backend.Domain.Shoe;
import com.example.Shop_App_Backend.Repository.ShoeRepository;
/*
import com.example.Shop_App_Backend.Domain.Client;
import com.example.Shop_App_Backend.Domain.Transaction;
import com.example.Shop_App_Backend.Repository.ShoeRepository;
import com.example.Shop_App_Backend.Repository.TransactionRepository;
 */
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShoeService {
    private ShoeRepository repository;
    //private TransactionRepository transactionRepository;

    public Shoe addService(Shoe entity) { return this.repository.save(entity); }

    public List<Shoe> addAllService(List<Shoe> entities) { return this.repository.saveAll(entities); }

    public Shoe getEntityById(Integer id) { return this.repository.findById(id).orElse(null); }

    public List<Shoe> getAll() { return this.repository.findAll(); }

    /*
    public Set<Client> getClientsWhoBoughtShoe(Integer shoeId)
    {
        Shoe entity = this.repository.findById(shoeId).orElse(null);
        if (entity != null)
        {
            Set<Transaction> shoeTransactions = this.getTransactionsForShoe(shoeId);
            if(!shoeTransactions.isEmpty())
            {
                Set<Client> clients = new HashSet<Client>();
                for(Transaction transaction : shoeTransactions)
                {
                    clients.add(transaction.getClient());
                }
                return clients;
            }
            return null;
        }
        return null;
    }

    public Set<Transaction> getTransactionsForShoe(Integer shoeId)
    {
        Shoe shoe = this.getEntityById(shoeId);
        if(shoe != null)
        {
            List<Transaction> transactionsList = this.transactionRepository.findAll();
            if(!transactionsList.isEmpty())
            {
                Set<Transaction> transactionsWithShoe = new HashSet<Transaction>();
                for(Transaction transaction : transactionsList)
                {
                    if(transaction.getShoe().getShoeId() == shoeId)
                    {
                        transactionsWithShoe.add(transaction);
                    }
                }
                return transactionsWithShoe;
            }
            return null;
        }
        return null;
    }
     */

    public boolean exists(Integer id) { return this.repository.existsById(id); }

    public void deleteService(Integer id) { this.repository.deleteById(id); }

    public Shoe updateService(Integer id, Shoe newEntity)
    {
        Shoe entityForUpdate = this.repository.findById(id).orElse(null);
        if(entityForUpdate != null)
        {
            //entityForUpdate.setColor(newEntity.getColor());
            entityForUpdate.setProduct_name(newEntity.getProduct_name());
            entityForUpdate.setPrice(newEntity.getPrice());
            //entityForUpdate.setSeason(newEntity.getSeason());
            //entityForUpdate.setRating(newEntity.getRating());
            //entityForUpdate.setQuantity(newEntity.getQuantity());
            return this.repository.save(entityForUpdate);
        }
        return null;
    }

    //filtering on a numerical field of Shoe class, bigger than a given value
    //filters all shoes which are available in a size bigger than a given value
    public List<Shoe> filterByQuantity(Integer givenValue)
    {
        return this.repository.findAll().stream().filter(shoe -> shoe.getSize() > givenValue)
                .collect(Collectors.toList());
    }
}
