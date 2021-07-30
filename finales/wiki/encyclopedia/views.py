from django import http
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
import markdown2
from random import randint
from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def create(request):
    if request.method == "POST":
        titulo = request.POST.get("titulo").strip()
        texto = request.POST.get("texto")
        lista = util.list_entries()
        print(titulo)
        print(texto)
        print(lista)
        if titulo == "":
            return render(request, "encyclopedia/create.html")
        if titulo in lista:
            return HttpResponse("Error -- titulo ya existe")
        util.save_entry(titulo, texto)
        return redirect("enc:show", titulo)
        
        
        

    return render(request, "encyclopedia/create.html", {        
    }
    )
    

def show(request, name):
    if util.get_entry(name):
        return render(request, "encyclopedia/show.html", {
            "name": name,
            "cuerpo": markdown2.markdown(util.get_entry(name))
        })
    else:
        return render(request, "encyclopedia/noexiste.html", {
            "message": "Page doesnt exists - 404"
        })


def search(request):
    q = request.GET.get('q').strip()
    lista = util.list_entries()
    print(f"este es q: {q}")
    print(f"esta es la lista: {lista}")
    if q in lista:
        return redirect("enc:show", name=q)
    print("me lo salto")
    return HttpResponse("que paha")

def editar(request, name):
    if request.method == "GET":
        texto = util.get_entry(name)
        return render(request, "encyclopedia/editar.html", {
            "name": name,
            "texto": texto
        })

    texto = request.POST.get("texto")
    lista = util.list_entries()
    util.save_entry(name, texto)
    return redirect("enc:show", name)

def random(request):
    lista = util.list_entries()
    print(lista)
    numero = randint(0,(len(lista)-1))
    print(numero)
    aleatorio = lista[numero]
    print(aleatorio)
    #return HttpResponse("hola hola")
    return redirect("enc:show", name=aleatorio)




