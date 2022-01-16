from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from CustomersApp.models import Customers
from CustomersApp.serializers import CustomerSerializer

# Create your views here.
@csrf_exempt
def home(request):
    return render(request, 'index.html')

#GET AND CREATE METHODS = Main Actions
@csrf_exempt
def main(request):
    if request.method == 'GET':
        customers = Customers.objects.all()
        customers_serializer = CustomerSerializer(customers, many=True)
        return JsonResponse(customers_serializer.data, safe=False)         
    elif request.method == 'POST':
        customers_data = JSONParser().parse(request)
        customers_serializer = CustomerSerializer(data=customers_data)
        if customers_serializer.is_valid():
            customers_serializer.save()
            return JsonResponse('Customer Saved', status=200, safe=False)
        return JsonResponse('Error saving customer', status=400)

#UPDATE AND DELETE METHODS = Secondary Actions
@csrf_exempt
def edit(request, id):
    if request.method == 'PUT':
        customers_data = JSONParser().parse(request)
        customer = Customers.objects.get(id = id)   
        customers_serializer = CustomerSerializer(customer, data=customers_data)
        if customers_serializer.is_valid():
            customers_serializer.save()
            return JsonResponse('Customer Updated', status=201, safe=False)
        return JsonResponse('Error updating customer', status=400)
    elif request.method == 'PATCH':
        customers_data = JSONParser().parse(request)
        customer = Customers.objects.get(id = id)    
        customers_serializer = CustomerSerializer(customer, data=customers_data, partial=True)
        if customers_serializer.is_valid():
            customers_serializer.save()
            return JsonResponse('Customer Updated', status=201, safe=False)
        return JsonResponse('Error updating customer', status=400)
    elif request.method == 'DELETE':
        customer = Customers.objects.get(id = id)
        customer.delete()
        return JsonResponse('Customer Deleted', status=201, safe=False)
    return JsonResponse('Error deleting customer', status=400) 
