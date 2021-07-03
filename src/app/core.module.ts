import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeService } from "./recipes/recipe.service";
import { InterceptorService } from "./auth/interceptor.service";

@NgModule({
    providers: [
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: InterceptorService, 
            multi: true 
        },
        RecipeService
    ],
})

export class CoreModule {}