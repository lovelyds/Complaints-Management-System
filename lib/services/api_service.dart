import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/category.dart';
import '../models/complaint.dart';

class ApiService {
  // Use 10.0.2.2 for Android Emulator, localhost for iOS/Web
  // You might need to change this based on your device
  static const String baseUrl = 'http://localhost:5000/api'; 
  // static const String baseUrl = 'http://10.0.2.2:5000/api';

  // Categories
  Future<List<Category>> getCategories() async {
    final response = await http.get(Uri.parse('$baseUrl/categories'));
    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      return body.map((dynamic item) => Category.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load categories');
    }
  }

  Future<Category> createCategory(Category category) async {
    final response = await http.post(
      Uri.parse('$baseUrl/categories'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(category.toJson()),
    );
    if (response.statusCode == 201) {
      return Category.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to create category');
    }
  }

  Future<void> deleteCategory(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/categories/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete category');
    }
  }

  // Complaints
  Future<List<Complaint>> getComplaints() async {
    final response = await http.get(Uri.parse('$baseUrl/complaints'));
    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      return body.map((dynamic item) => Complaint.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load complaints');
    }
  }

  Future<Complaint> createComplaint(Complaint complaint) async {
    final response = await http.post(
      Uri.parse('$baseUrl/complaints'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(complaint.toJson()),
    );
    if (response.statusCode == 201) {
      return Complaint.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to create complaint');
    }
  }

  Future<Complaint> updateComplaint(String id, Map<String, dynamic> updates) async {
    final response = await http.put(
      Uri.parse('$baseUrl/complaints/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(updates),
    );
    if (response.statusCode == 200) {
      return Complaint.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to update complaint');
    }
  }

  Future<void> deleteComplaint(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/complaints/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete complaint');
    }
  }
}
