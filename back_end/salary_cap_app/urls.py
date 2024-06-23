from django.urls import path
from .views import Sign_up, Info, Log_out, Log_in


urlpatterns = [
    path("", Info.as_view()),
    path("signup/", Sign_up.as_view()),
    path("login/", Log_in.as_view()),
    path("logout/", Log_out.as_view()),
]