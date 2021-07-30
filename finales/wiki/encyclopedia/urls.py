from django.urls import path

from . import views

app_name = "enc"
urlpatterns = [
    path("", views.index, name="index"),
    path("search", views.search, name="search"),
    path("create", views.create, name="create"),
    path("wiki/<str:name>", views.show, name="show"),
    path("editar/<str:name>", views.editar, name="editar"),
    path("random", views.random, name="random")
]


