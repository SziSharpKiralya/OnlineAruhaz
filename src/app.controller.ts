import { Controller, Get, Body, Query, Render, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './interfaces/Product.js';
import { CreateProductDto } from './interfaces/CreateProductDto.dto.js';

let termekek: Product[] = [
  {
    name: 'Vezeték nélküli egér',
    category: 'elektronika',
    price: 8990,
    stock: 12,
  },
  {
    name: 'Programozás kezdőknek',
    category: 'könyv',
    price: 6490,
    stock: 4,
  },
  {
    name: 'Mechanikus billentyűzet',
    category: 'elektronika',
    price: 24990,
    stock: 3,
  },
  {
    name: 'Fekete kapucnis pulóver',
    category: 'ruházat',
    price: 12990,
    stock: 8,
  },
  {
    name: 'Catan társasjáték',
    category: 'játék',
    price: 11990,
    stock: 0,
  },
  {
    name: 'USB-C töltőkábel',
    category: 'elektronika',
    price: 4990,
    stock: 25,
  },
  {
    name: 'Adidas sportcipő',
    category: 'ruházat',
    price: 27990,
    stock: 2,
  },
  {
    name: 'A kis herceg',
    category: 'könyv',
    price: 3990,
    stock: 15,
  },
  {
    name: 'LEGO City rendőrségi állomás',
    category: 'játék',
    price: 34990,
    stock: 5,
  },
  {
    name: 'Bluetooth hangszóró',
    category: 'elektronika',
    price: 15990,
    stock: 7,
  },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'Főoldal',
    };
  }

  @Get('termeklista')
  @Render('termeklista')
  getTermeklista() {
    return {
      title: 'Terméklista',
      termekek: termekek,
    };
  }

  @Get('filter')
  @Render('filter')
  getFilter(@Query('categorySend') categorySend: string) {
    const filteredProducts = [...termekek].sort((a, b) => b.stock - a.stock);

    if (!categorySend) {
      return {
        title: 'Szűrő',
        termekek: filteredProducts,
      };
    } else {
      console.log(categorySend);
      return {
        title: 'Szűrő',
        termekek: filteredProducts.filter(
          (product) => product.category === categorySend,
        ),
      };
    }
  }

  @Get('/new')
  @Render('new')
  getNew() {
    return {
      title: 'Új felvétele',
      success: false,
    };
  }

  @Post('/new')
  @Render('new')
  addNew(@Body() body: CreateProductDto) {
    if (!body.name || !body.category || !body.price || !body.stock) {
      return {
        title: 'Új felvétele',
        success: false,
      };
    }

    const ujTermek: Product = {
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock
    }

    termekek.push(ujTermek);
    return {
      title: 'Új felvétele',
      success: true,
    };
  }
}
