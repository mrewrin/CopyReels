from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'password_confirm', 'phone_number', 'date_of_birth')
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs


    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data.get('phone_number'),
            date_of_birth=validated_data.get('date_of_birth')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
