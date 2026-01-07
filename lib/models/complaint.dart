import 'category.dart';

class Complaint {
  final String id;
  final String title;
  final String description;
  final String status;
  final DateTime dateSubmitted;
  final String categoryId;
  final Category? category; // Populated category

  Complaint({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.dateSubmitted,
    required this.categoryId,
    this.category,
  });

  factory Complaint.fromJson(Map<String, dynamic> json) {
    return Complaint(
      id: json['_id'],
      title: json['title'],
      description: json['description'],
      status: json['status'],
      dateSubmitted: DateTime.parse(json['dateSubmitted']),
      categoryId: json['categoryId'] is Map ? json['categoryId']['_id'] : json['categoryId'],
      category: json['categoryId'] is Map ? Category.fromJson(json['categoryId']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'status': status,
      'categoryId': categoryId,
    };
  }
}
