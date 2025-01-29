from django.shortcuts import render
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView,UpdateAPIView,DestroyAPIView
from api.serializers import LeadSerializer
from api.models import Lead
from django.db.models import Q
from rest_framework import authentication, permissions

# Create your views here.


# lead Create,List,Retrieve,Update,Delete


class LeadListCreateView(CreateAPIView,ListAPIView):
    
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    serializer_class=LeadSerializer
    queryset=Lead.objects.all()
    
    def get_queryset(self):
        filter_text = self.request.query_params # {'search_text':'hello'}
        
        qs = Lead.objects.all()
        
        if filter_text:
            search_value = filter_text.get('search_text')
            qs = qs.filter(Q(name__contains=search_value) | Q(email__contains=search_value) | Q(mobile__contains=search_value))
            
        return qs


class LeadRetrieveUpdateDestroyView(RetrieveAPIView,UpdateAPIView,DestroyAPIView):
    
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    serializer_class=LeadSerializer
    queryset=Lead.objects.all()
