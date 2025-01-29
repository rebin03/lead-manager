from django.urls import path
from api import views
from rest_framework.authtoken.views import ObtainAuthToken


urlpatterns=[

    path("leads/",views.LeadListCreateView.as_view()),
    path("leads/<int:pk>/",views.LeadRetrieveUpdateDestroyView.as_view()),
    path("token/",ObtainAuthToken.as_view())
    
]