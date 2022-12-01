import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProduitsService } from 'src/app/services/produitsService/produits.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUploadService } from 'src/app/services/imageUpload/image-upload.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-update-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  p: Product = new Product();
  file!: string;
  selectedFile!: ImageSnippet;
  loading = false;

  constructor(private produitService: ProduitsService, private router: Router, private iu: ImageUploadService, private authService: AuthService) {


  }

  ngOnInit(): void {
  }
  save(id: number, imageInput: any) {

    this.loading = true;
    this.p.userId = this.authService.user.userId;
    console.log(this.authService.user.userId)
    const file: File = imageInput.files[0];
    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une image ! ...');

    }
    if (file != null) {
      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        (await this.iu.uploadFile(this.selectedFile.file)).subscribe(res => {
          console.log(res.secure_url);
          this.p.image = res.secure_url;
          this.produitService.addProduct(this.p).subscribe(data => { this.router.navigate(['/user/produits']) });
          this.loading = false;
        })
      });
      reader.readAsDataURL(file);
    } else {
      this.produitService.addProduct(this.p).subscribe(data => { this.router.navigate(['/admin/produits']) });
    }


  }


}


