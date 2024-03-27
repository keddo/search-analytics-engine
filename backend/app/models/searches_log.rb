class SearchesLog < ApplicationRecord
    def self.log(ip, query)
        # Log search query with IP address
        SearchesLog.create(user_ip: ip, text: query)
    end

    # Method to aggregate and summarize search queries
    def self.summarize_search_queries
        # Group similar search queries together and count their occurrences
        search_summary = group(:query).count

        # Filter out incomplete or redundant search queries (example criteria: queries with fewer than 3 characters)
        search_summary.reject! { |query, count| query.length < 3 }

        # Sort the search summary by count in descending order
        search_summary = search_summary.sort_by { |_query, count| -count }

        # Return the summarized search data
        search_summary
    end
end
