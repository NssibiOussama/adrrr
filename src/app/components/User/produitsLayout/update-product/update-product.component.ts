import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitsService } from 'src/app/services/produitsService/produits.service';
import { ImageUploadService } from 'src/app/services/imageUpload/image-upload.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  p: Product = new Product();
  file!: string;
  selectedFile!: ImageSnippet;
  loading = false;

  constructor(private produitService: ProduitsService, private ac: ActivatedRoute, private router: Router, private iu: ImageUploadService) {

  }

  ngOnInit(): void {
    this.produitService.getProduct(this.ac.snapshot.params['id']).subscribe(response => {
      this.p = response;
    });
  }
  save(id: number, imageInput: any) {
   
      this.loading = true;
      const file: File = imageInput.files[0];
      if (file != null) {
        const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        (await this.iu.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.p.image = res.url;
          this.produitService.updateProduct(this.p, id).subscribe(data => { this.router.navigate(['/user/produits']) });
          this.loading = false;
        })
      });
      reader.readAsDataURL(file);
      }else{
        this.produitService.updateProduct(this.p, id).subscribe(data => { this.router.navigate(['/user/produits']) });


      }
    

  }
  
  
}


