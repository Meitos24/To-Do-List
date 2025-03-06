from django.urls import path
from .views.home_views import index

urlpatterns = [
    path("", index, name="index")
]
