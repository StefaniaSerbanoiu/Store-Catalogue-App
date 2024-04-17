package com.example.Shop_App_Backend;

import com.example.Shop_App_Backend.API.ShoeController;
import com.example.Shop_App_Backend.API.SuggestionController;
import com.example.Shop_App_Backend.Domain.Shoe;
import com.example.Shop_App_Backend.Domain.Suggestion;
import com.example.Shop_App_Backend.Service.ShoeService;
import com.example.Shop_App_Backend.Service.SuggestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class EntitySuggestionTests {

	@Mock
	private SuggestionService suggestionService;

	@InjectMocks
	private SuggestionController suggestionController;

	private Suggestion testSuggestion;

	@BeforeEach
	void setUp() {
		testSuggestion = new Suggestion();
		testSuggestion.setSuggestion_id(1);
		testSuggestion.setTitle("Test Suggestion");
		testSuggestion.setAdvice("This is a test advice.");

		// Reset mock before each test
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testAddSuggestion() {
		when(suggestionService.addServiceWithoutReference(any(Suggestion.class))).thenReturn(testSuggestion);
		Suggestion addedSuggestion = suggestionController.add2(testSuggestion);
		assertEquals(testSuggestion, addedSuggestion);
	}

	@Test
	void testGetAllSuggestions() {
		List<Suggestion> suggestionList = Arrays.asList(testSuggestion);
		when(suggestionService.getAll()).thenReturn(suggestionList);
		ResponseEntity<Object> response = suggestionController.getAll();
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void testGetSuggestionById() {
		when(suggestionService.getEntityById(anyInt())).thenReturn(testSuggestion);
		ResponseEntity<Object> response = suggestionController.getById("1");
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void testUpdateSuggestion() {
		when(suggestionService.updateService(anyInt(), any(Suggestion.class))).thenReturn(testSuggestion);
		ResponseEntity<Object> response = suggestionController.update(1, testSuggestion);
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	void testDeleteSuggestion() {
		ResponseEntity<Object> response = suggestionController.delete(1);
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}
}
