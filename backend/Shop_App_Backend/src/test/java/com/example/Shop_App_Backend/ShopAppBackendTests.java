package com.example.Shop_App_Backend;

import com.example.Shop_App_Backend.API.ShoeController;
import com.example.Shop_App_Backend.Domain.Shoe;
import com.example.Shop_App_Backend.Service.ShoeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ShopAppBackendTests {

	@Mock
	private ShoeService shoeService;

	@InjectMocks
	private ShoeController shoeController;

	private Shoe testShoe;

	@BeforeEach
	void setUp() {
		testShoe = new Shoe();
		testShoe.setShoe_id(1);
		testShoe.setProduct_name("Test Shoe");
		testShoe.setSize(42);
		testShoe.setPrice(100);

		// Reset mock before each test
		reset(shoeService);
	}

	@Test
	public void testGetAllShoes() {
		List<Shoe> shoeList = new ArrayList<>();
		shoeList.add(testShoe);

		when(shoeService.getAll()).thenReturn(shoeList);

		ResponseEntity<Object> responseEntity = shoeController.getAll(null, null);

		assertEquals(shoeList, responseEntity.getBody());
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

		verify(shoeService, times(1)).getAll();
	}

	@Test
	public void testGetAllShoesAscending() {
		List<Shoe> shoeList = new ArrayList<>();
		shoeList.add(testShoe);

		// Mocking the getAllSortedByPrice method instead of getAll
		when(shoeService.getAllSortedByPrice(Sort.Direction.ASC)).thenReturn(shoeList);

		// Calling the controller method with sorting parameters
		ResponseEntity<Object> responseEntity = shoeController.getAll("price", "asc");

		// Asserting the response
		assertEquals(shoeList, responseEntity.getBody());
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

		// Verifying that the getAllSortedByPrice method is called with the correct sorting direction
		verify(shoeService, times(1)).getAllSortedByPrice(Sort.Direction.ASC);
	}


	@Test
	public void testGetShoeById() {
		when(shoeService.getEntityById(1)).thenReturn(testShoe);

		ResponseEntity<Object> responseEntity = shoeController.getById("1");

		assertEquals(testShoe, responseEntity.getBody());
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

		verify(shoeService, times(1)).getEntityById(1);
	}

	@Test
	public void testDeleteShoe() {
		when(shoeService.exists(1)).thenReturn(true);

		ResponseEntity<Object> responseEntity = shoeController.delete(1);

		assertEquals("Shoe with id 1 was successfully deleted.", responseEntity.getBody());
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

		verify(shoeService, times(1)).deleteService(1);
	}

	@Test
	public void testUpdateShoe() {
		when(shoeService.updateService(1, testShoe)).thenReturn(testShoe);

		ResponseEntity<Object> responseEntity = shoeController.update(1, testShoe);

		assertEquals(testShoe, responseEntity.getBody());
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

		verify(shoeService, times(1)).updateService(1, testShoe);
	}

	@Test
	public void testUnsuccessfulDeleteShoe() {
		when(shoeService.exists(1)).thenReturn(false); // Simulate non-existent shoe

		ResponseEntity<Object> responseEntity = shoeController.delete(1);

		assertEquals("Shoe with id 1 was not found.", responseEntity.getBody());
		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

		verify(shoeService, times(0)).deleteService(1); // Make sure deleteService method is not called
	}

	@Test
	public void testUnsuccessfulUpdateShoe() {
		when(shoeService.updateService(1, testShoe)).thenReturn(null); // Simulate unsuccessful update

		ResponseEntity<Object> responseEntity = shoeController.update(1, testShoe);

		assertEquals("The shoe with id 1 was not found.", responseEntity.getBody());
		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

		verify(shoeService, times(1)).updateService(1, testShoe);
	}

	@Test
	public void testAddShoe() {
		when(shoeService.addService(any())).thenReturn(testShoe);

		Shoe result = shoeController.add(testShoe);

		assertEquals(testShoe, result);

		verify(shoeService, times(1)).addService(any());
	}

	@Test
	public void testUnsuccessfulGetShoeById() {
		when(shoeService.getEntityById(1)).thenReturn(null); // Simulate non-existent shoe

		ResponseEntity<Object> responseEntity = shoeController.getById("1");

		assertEquals("Shoe with id 1 was not found.", responseEntity.getBody());
		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

		verify(shoeService, times(1)).getEntityById(1);
	}
}
