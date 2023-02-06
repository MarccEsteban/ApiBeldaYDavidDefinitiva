import { Component, OnInit } from '@angular/core';
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-series-list',
  templateUrl: 'series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SerieListComponent implements OnInit {
// creamos el array donde guardaremos las películas
// que traigamos de la API REST
  series: Serie[] = [];

  formSerie: FormGroup = this.formBuilder.group({
    _id: [''],
    imagenes: [],
    titulo: [''],
    categorias: [],
    num_capitulos: [0],
    anyo_emision: [2022],
    sinopsis: [''],
    puntuacion: [],
    email: [''],
    puntuacion_personal: []
  });
// Creamos el input para añadir un nuevo género
  mynewCategoria = new FormGroup({
    newCategoria: new FormControl('')
  });
// Creamos el array que guardara todos los géneros
// que tenemos en la base de datos
  categorias: string[] = [];
// Creamos la variable editar para diferenciar
// Editar de nueva película
  editar = false;

// inyectamos el servicio para poder utilizarlo
  constructor(private serieService: SerieService,private formBuilder: FormBuilder) { }
// en el ngOnInit es donde se ponen las
// funciones que queremos ejecutar cuando se
// inicie este componente
// en nuestro caso queremos que se lean las películas
  ngOnInit(): void {
    this.listSeries();
  }

// Y definimos la función que carga los restaurantes
// que la hemos llamado desde el ngOnInit
  listSeries(): void {
    this.serieService.getSerieList().subscribe(
      (data: any) => {
        this.series = data;
      }
    );

// Añadimos la función que nos devuelve los géneros
    this.serieService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      }
    )
  }
  // Función para cuando guarden el formulario
// que diferencia si están actualizando o añadiendo
  onSubmit() {
// si estamos actualizando, llamamos a actualizar
    if (this.editar){

      const id = this.formSerie.getRawValue()._id;
      this.serieService.updateSerie(id,
        this.formSerie.getRawValue()).subscribe(
        data => {
          this.listSeries();
        }
      );
    }
// si no, es que vamos a añadir una película nueva
    else{
      this.serieService.newSerie(this.formSerie.getRawValue()).subscribe(
        data => {
          console.log(data);
          this.listSeries();
        }
      )
    }
  }

// Función para cargar la película que vamos a actualizar
// Ponemos el boolean Editar a true
  loadSerie(serie: Serie) {
    this.formSerie.setValue(serie);
    this.editar = true;
  }

// Función para borrar el formulario para añadir una
// película nueva. Editar a falso
  newSerie() {
    this.formSerie.reset();
    this.editar = false;
  }

// Función para añadir un nuevo género a la lista
// Diferenciamos la lista de nueva película

// De la de actualizar
  addNewCategoria(newGenre: string | null) {
    let newCategorias;
// si es nueva película añadimos el género a nuestra
// lista de géneros de la base de datos
    if(!this.editar && newCategorias)this.categorias.push(newCategorias)
// si no entonces tenemos que añadir el género
// a los géneros de la película que estamos actualizando

    else {
// Guardo el array de géneros
      newCategorias = this.formSerie.getRawValue().categorias;
// Añado el nuevo género al array
      newCategorias.push(newCategorias);
// Actualizo el array de géneros en el formulario
      this.formSerie.setControl(
        'categorias',
        new FormControl(newCategorias)
      );
    }
// para terminar borramos el campo del nuevo género
    this.mynewCategoria.reset();
  }
  removeSerie(serie: Serie){

  }

}
