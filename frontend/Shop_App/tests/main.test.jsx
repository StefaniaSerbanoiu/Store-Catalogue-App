import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import Home from '../src/Home';
import React from 'react';
import Update from '../src/Update';
import Create from '../src/Create';
import Read from '../src/Read';
import { BrowserRouter } from 'react-router-dom';
import Suggestions from '../src/SuggestionEntity/Suggestions';




describe('Home Component', () => {
  it('renders without crashing', () => {
    console.log("111111111111111111111111111111111");
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    console.log("222222222222222222222222222222222");
    const headingElement = screen.getByText('List of products');
    expect(headingElement).not.toBeNull();
  });
});


describe('Update Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Update />
      </BrowserRouter>
    );
    const headingElement = screen.getByText('Update product info');
    expect(headingElement).not.toBeNull();
  });
});


describe('Create Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );
    const headingElement = screen.getByText('Add');
    expect(headingElement).not.toBeNull();
  });
});

describe('View Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Read />
      </BrowserRouter>
    );
    const headingElement = screen.getByText('Details');
    expect(headingElement).not.toBeNull();
  });
});

describe('View Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Suggestions />
      </BrowserRouter>
    );
    const headingElement = screen.getByText('Style advice');
    expect(headingElement).not.toBeNull();
  });
});